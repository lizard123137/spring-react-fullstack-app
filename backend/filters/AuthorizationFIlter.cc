#pragma once

#include "AuthorizationFilter.h"

using namespace drogon;

void AuthorizationFilter::doFilter(
        const HttpRequestPtr& req,
        FilterCallback&& fcb,
        FilterChainCallback&& fccb
) {
    // TODO check JWT token
    fccb(); // For now just jump to next filter
}