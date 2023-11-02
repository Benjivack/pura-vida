from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from queries.status import (StatusIn,
                            StatusRepository,
                            StatusOut,
                            StatusGetOut,
                            Error)
from authenticator import authenticator
from typing import List, Union
from datetime import datetime, timezone
import json

router = APIRouter()


@router.post("/api/status")
def create_status(
    status: StatusIn,
    repo: StatusRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
        ):
    return repo.create_status(status)


@router.put("/api/status/{status_id}", response_model=Union[StatusOut, Error])
def update_status(
    status_id: int,
    status: StatusIn,
    repo: StatusRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
        )
) -> Union[StatusOut, Error]:
    return repo.update(status_id, status)


@router.get("/api/status/{post_id}",
            response_model=Union[List[StatusGetOut], Error])
def get_all(
    post_id: int,
    repo: StatusRepository = Depends(),
):
    return repo.get_all(post_id)


@router.delete(
        "/api/status/{status_id}",
        response_model=Union[bool, Error]
)
def delete_status(
    status_id: int,
    status: StatusRepository = Depends(),
):
    return status.delete(status_id)


@router.get("/api/status/",
            response_model=Union[List[StatusGetOut], Error])
def get_every(
    repo: StatusRepository = Depends(),
):
    return repo.get_every()


def timestamp():
    return datetime.now(timezone.utc).isoformat()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.current_message_id = 0

    async def connect(
        self,
        websocket: WebSocket,
        client_id: int,
    ):
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.send_personal_message(
            "Welcome!",
            client_id,
            websocket,
        )

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(
        self,
        message: str,
        client_id: int,
        websocket: WebSocket,
    ):
        payload = json.dumps({
            "client_id": client_id,
            "content": message,
            "timestamp": timestamp(),
            "message_id": self.next_message_id(),
        })
        await websocket.send_text(payload)

    async def broadcast(self, message: str, client_id: int):
        payload = json.dumps({
            "client_id": client_id,
            "content": message,
            "timestamp": timestamp(),
            "message_id": self.next_message_id(),
        })
        print('active connections:', len(self.active_connections))
        for connection in self.active_connections:
            await connection.send_text(payload)

    def next_message_id(self):
        self.current_message_id += 1
        return self.current_message_id


manager = ConnectionManager()


@router.websocket("/chat/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    client_id: int,
):
    await manager.connect(websocket, client_id)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, client_id)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Disconnected", client_id)
