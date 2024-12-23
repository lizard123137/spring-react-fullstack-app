#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace api
{
class UsersController : public drogon::HttpController<UsersController> {
public:
    METHOD_LIST_BEGIN
        ADD_METHOD_TO(UsersController::index, "/users", Get);
    METHOD_LIST_END

    void index(
        const HttpRequestPtr& req,
        std::function<void (const HttpResponsePtr&)>&& callback
    );
};
}