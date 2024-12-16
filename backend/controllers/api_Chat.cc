#include "api_Chat.h"

using namespace api;

void Chat::handleNewMessage(const WebSocketConnectionPtr& wsConnPtr, std::string &&message, const WebSocketMessageType &type)
{
    if (type == WebSocketMessageType::Ping) {
        LOG_DEBUG << "received a ping";
    }
    else if (type == WebSocketMessageType::Text) {
        LOG_DEBUG << message;
    }
}

void Chat::handleNewConnection(const HttpRequestPtr &req, const WebSocketConnectionPtr& wsConnPtr)
{
    LOG_DEBUG << "Received new connection";
    wsConnPtr->send("User Connected!");
    // TODO use the PubSubService to handle chat rooms
}

void Chat::handleConnectionClosed(const WebSocketConnectionPtr& wsConnPtr)
{
    LOG_DEBUG << "Closing connection";
}
