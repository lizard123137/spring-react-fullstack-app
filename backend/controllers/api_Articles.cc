#include "api_Articles.h"

using namespace api;

// Add definition of your processing function here


void Articles::index(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback
) {
    Json::Value ret;
    ret["result"] = "ok";

    auto resp = HttpResponse::newHttpJsonResponse(ret);
    callback(resp);
}

void Articles::show(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback,
    const std::string& slug
) {
    LOG_DEBUG << "Requested article: " << slug;

    Json::Value ret;
    ret["slug"] = slug;

    auto resp = HttpResponse::newHttpJsonResponse(ret);
    callback(resp);
}