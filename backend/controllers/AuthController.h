#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class AuthController : public drogon::HttpController<AuthController>
{
  public:
    METHOD_LIST_BEGIN
        METHOD_ADD(AuthController::login, "/login", Post);

    METHOD_LIST_END

    void login(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr&)>&& callback);
};
