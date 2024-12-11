#include "api_Authorization.h"

using namespace api;

// Add definition of your processing function here
void Authorization::login(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback
) {
    auto json = req->getJsonObject();

    if (!json) {
        auto resp = drogon::HttpResponse::newHttpJsonResponse(
            Json::Value{"Error", "Missing JSON payload"}
        );
        resp->setStatusCode(drogon::k400BadRequest);
        callback(resp);
        return;
    }

    std::string username = (*json)["username"].asString();
    std::string password = (*json)["password"].asString();

    if (username.empty() || password.empty()) {
        auto resp = drogon::HttpResponse::newHttpJsonResponse(
            Json::Value("Error", "Username and Password can't be empty")
        );
        resp->setStatusCode(drogon::k400BadRequest);
        callback(resp);
        return;
    }

    // Get DBClient
    auto dbClient = drogon::app().getDbClient();
    *dbClient << "SELECT password FROM users WHERE username = $1"
        << username
        >> [password, callback](const drogon::orm::Result& result) {
            // TODO check password instead of just checking if user exists
            if (result.empty()) {
                auto resp = drogon::HttpResponse::newHttpJsonResponse(
                    Json::Value("Error", "Invalid username or password")
                );
                resp->setStatusCode(drogon::k401Unauthorized);
                callback(resp);
                return;
            }

            // Login successful
            // TODO add JWT generation or session token
            Json::Value data;
            data["message"] = "Login successfull";

            auto resp = drogon::HttpResponse::newHttpJsonResponse(data);
            callback(resp);
        }
        >> [callback](const drogon::orm::DrogonDbException& e) {
            LOG_ERROR << "Database error: " << e.base().what();

            auto resp = drogon::HttpResponse::newHttpJsonResponse(
                Json::Value("Error", "Database error")
            );
            resp->setStatusCode(drogon::k500InternalServerError);
            callback(resp);
        };
}