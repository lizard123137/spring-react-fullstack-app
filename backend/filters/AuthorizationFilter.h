#pragma once

#include <drogon/HttpFilter.h>


using namespace drogon;

class AuthorizationFilter : public HttpFilter<AuthorizationFilter> {
public:
    AuthorizationFilter() = default;

    void doFilter(
        const HttpRequestPtr& req,
        FilterCallback&& fcb,
        FilterChainCallback&& fccb
    ) override;
};