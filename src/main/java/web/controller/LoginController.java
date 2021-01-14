package web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import web.model.Person;
import web.service.PersonService;

import java.security.Principal;

@RestController
public class LoginController {

    @Autowired
    @Qualifier("personServiceImp")
    private PersonService personService;

    @GetMapping(value = "/login")
    public ModelAndView getLoginPage () {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName( "login");
        return modelAndView;
    }
    @GetMapping(value = "/user")
    public ModelAndView getUserPage(Model model, @AuthenticationPrincipal Person customUser) {
        model.addAttribute("person_v2", customUser);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("user");
        return modelAndView;
    }

}
