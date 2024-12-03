#include <fstream>

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

    std::string articles_dir = "../articles/";
    std::string file_path = articles_dir + slug + ".md";

    LOG_DEBUG << "Trying to access file at: " << file_path;

    if (!std::filesystem::exists(file_path)) {
        auto response = HttpResponse::newHttpResponse();
        response->setStatusCode(HttpStatusCode::k404NotFound);
        response->setBody("Article with that slug doesn't exist");
        callback(response);
        return;
    }

    std::ifstream file(file_path);
    std::ostringstream content;
    content << file.rdbuf();
    file.close();

    Json::Value data;
    data["slug"] = slug;
    data["content"] = content.str();

    auto response = HttpResponse::newHttpJsonResponse(data);
    callback(response);
}