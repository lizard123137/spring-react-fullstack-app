#include "api_Chat.h"

using namespace api;

struct Subscriber {
    std::string chatRoomName_;
    drogon::SubscriberID id_;
};

void Chat::handleNewMessage(const WebSocketConnectionPtr& wsConnPtr, std::string &&message, const WebSocketMessageType &type)
{
    if (type == WebSocketMessageType::Ping) {
        LOG_DEBUG << "received a ping";
    }
    else if (type == WebSocketMessageType::Text) {
        auto& s = wsConnPtr->getContextRef<Subscriber>();
        chatRooms.publish(s.chatRoomName_, message);
    }
}

void Chat::handleNewConnection(const HttpRequestPtr &req, const WebSocketConnectionPtr& wsConnPtr)
{
    LOG_DEBUG << "Received new connection";
    wsConnPtr->send("User Connected!");
    
    Subscriber s;
    s.chatRoomName_ = req->getParameter("room_name");
    s.id_ = chatRooms.subscribe(
        s.chatRoomName_,
        [wsConnPtr](const std::string& topic, const std::string& message) {
            (void)topic;
            wsConnPtr->send(message);
        }
    );

    wsConnPtr->setContext(std::make_shared<Subscriber>(std::move(s)));
}

void Chat::handleConnectionClosed(const WebSocketConnectionPtr& wsConnPtr)
{
    LOG_DEBUG << "Closing connection";
    auto& s = wsConnPtr->getContextRef<Subscriber>();
    chatRooms.unsubscribe(s.chatRoomName_, s.id_);
}
