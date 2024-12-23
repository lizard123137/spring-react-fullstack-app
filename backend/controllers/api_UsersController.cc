#include "api_UsersController.h"

using namespace api;

void UsersController::index(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback
) {
    auto callbackPtr = std::make_shared<std::function<void (const HttpResponsePtr&)>>(move(callback));
    auto dbClient = drogon::app().getDbClient();

    if (!dbClient) {
        LOG_ERROR << "Database client is not initialized!";

        Json::Value ret;
        ret["error"] = "Database client is not initialized";

        auto resp = HttpResponse::newHttpJsonResponse(ret);
        resp->setStatusCode(HttpStatusCode::k500InternalServerError);

        (*callbackPtr)(resp);
        return;
    }

    *dbClient << "SELECT * FROM users"
        >> [callbackPtr](const drogon::orm::Result& r) {
            Json::Value ret;
            
            for (const auto& row : r) {
                Json::Value user;
                user["username"] = row["username"].as<std::string>();
                user["email"] = row["email"].as<std::string>();
                ret["users"].append(user);
            }

            auto resp = HttpResponse::newHttpJsonResponse(ret);
            resp->setStatusCode(HttpStatusCode::k200OK);
            (*callbackPtr)(resp);
        }
        >> [callbackPtr](const drogon::orm::DrogonDbException& e) {
            LOG_ERROR << e.base().what();

            Json::Value ret;
            ret["error"] = e.base().what();

            auto resp = HttpResponse::newHttpJsonResponse(ret);
            resp->setStatusCode(HttpStatusCode::k500InternalServerError);
            (*callbackPtr)(resp);
        };
}