package org.kelog.todolist.web;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * CrossOrigin annotation does not work for me for nested url-s like '/path/{id},
 * so I copy-n-paste this instead.
 * http://stackoverflow.com/questions/32319396/cors-with-spring-boot-and-angularjs-not-working
 */
@Component
public class CorsFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
        
        chain.doFilter(req, res);
    }
    
    @Override
    public void init(FilterConfig filterConfig) {
    }
    
    @Override
    public void destroy() {
    }
}
