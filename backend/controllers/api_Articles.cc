#include <filesystem>
#include <fstream>

#include "api_Articles.h"

using namespace api;

// Docker workdir is /usr/src/backend
const std::string articles_dir = "./articles/";

void Articles::index(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback
) {
    Json::Value articles(Json::arrayValue);

    LOG_DEBUG << "Current working directory: " << std::filesystem::current_path(); 

    HttpResponsePtr response;

    try {
        for (const auto& file : std::filesystem::directory_iterator(articles_dir)) {
            if (file.is_regular_file())
                articles.append(file.path().filename().string());
        }

        response = HttpResponse::newHttpJsonResponse(articles);        
    } catch(const std::filesystem::filesystem_error& e) {
        Json::Value err;
        err["error"] = e.what();

        response = HttpResponse::newHttpJsonResponse(err);
        response->setStatusCode(k500InternalServerError);
        callback(response);
        return;
    }

    // Add CORS headers to the response
    response->addHeader("Access-Control-Allow-Origin", "*"); // TODO change from * - unsecure for debugging
    response->addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response->addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    callback(response);
}

void Articles::show(
    const HttpRequestPtr& req,
    std::function<void (const HttpResponsePtr&)>&& callback,
    const std::string& slug
) {
    LOG_DEBUG << "Requested article: " << slug;

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