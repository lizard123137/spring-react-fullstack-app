#pragma once

#include <drogon/HttpSimpleController.h>

using namespace drogon;

namespace api
{
class test : public drogon::HttpSimpleController<test>
{
  public:
    void asyncHandleHttpRequest(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback) override;
    PATH_LIST_BEGIN
    // list path definitions here;
    // PATH_ADD("/path", "filter1", "filter2", HttpMethod1, HttpMethod2...);
    PATH_ADD("/test", Get, Options);
    PATH_LIST_END
};
}
