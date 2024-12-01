#include "AuthController.h"

void AuthController::login(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr&)>&& callback) {
    LOG_DEBUG << "User tried to log in";

    Json::Value ret;
    ret["result"] = "ok";
    ret["token"] = drogon::utils::getUuid();
    auto resp = HttpResponse::newHttpJsonResponse(ret);
    callback(resp);
}