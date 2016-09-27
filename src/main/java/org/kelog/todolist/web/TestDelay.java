package org.kelog.todolist.web;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class TestDelay {
    
    // edit for network lag simulation
    private static final int DELAY_MS = 0;
    
    @Before("execution(* org.kelog..*Controller.*(..))")
    public void delay() {
        try {
            Thread.sleep(DELAY_MS);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
