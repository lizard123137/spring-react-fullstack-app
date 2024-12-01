#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

class ArticlesController : public drogon::HttpController<ArticlesController>
{
  public:
    METHOD_LIST_BEGIN
        ADD_METHOD_TO(ArticlesController::getAllArticles, "/", Get);
    METHOD_LIST_END

    auto getAllArticles(const HttpRequestPtr &req) -> void;
};
