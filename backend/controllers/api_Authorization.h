#pragma once

#include <drogon/HttpController.h>

using namespace drogon;

namespace api
{
class Authorization : public drogon::HttpController<Authorization>
{
public:
    METHOD_LIST_BEGIN
    // use METHOD_ADD to add your custom processing function here;
    // METHOD_ADD(Authorization::get, "/{2}/{1}", Get); // path is /api/Authorization/{arg2}/{arg1}
    // METHOD_ADD(Authorization::your_method_name, "/{1}/{2}/list", Get); // path is /api/Authorization/{arg1}/{arg2}/list
    // ADD_METHOD_TO(Authorization::your_method_name, "/absolute/path/{1}/{2}/list", Get); // path is /absolute/path/{arg1}/{arg2}/list
    METHOD_ADD(Authorization::loginUser, "/login", Post);
    METHOD_ADD(Authorization::registerUser, "/register", Post);

    METHOD_LIST_END
    // your declaration of processing function maybe like this:
    // void get(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, int p1, std::string p2);
    // void your_method_name(const HttpRequestPtr& req, std::function<void (const HttpResponsePtr &)> &&callback, double p1, int p2) const;

    void loginUser(
        const HttpRequestPtr& req,
        std::function<void (const HttpResponsePtr&)>&& callback
    );

    void registerUser(
        const HttpRequestPtr& req,
        std::function<void (const HttpResponsePtr&)>&& callback
    );
};
}
