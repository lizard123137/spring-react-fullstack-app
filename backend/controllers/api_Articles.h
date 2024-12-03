#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace api
{
class Articles : public drogon::HttpController<Articles>
{
  public:
    METHOD_LIST_BEGIN
    METHOD_ADD(Articles::index, "/", Get);
    METHOD_ADD(Articles::show, "/{1}", Get);
    METHOD_LIST_END

    void index(
        const HttpRequestPtr& req,
        std::function<void (const HttpResponsePtr&)>&& callback
    );
    void show(
        const HttpRequestPtr& req,
        std::function<void (const HttpResponsePtr&)>&& callback,
        const std::string& slug
    );
};
}
