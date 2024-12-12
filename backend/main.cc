#include <drogon/drogon.h>

using namespace drogon;

int main() {
    drogon::app().loadConfigFile("config.json");

    LOG_DEBUG << "Starting application";
    
    drogon::app().run();
    return 0;
}
