package web.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import web.model.Person;

import web.service.PersonService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class PeopleRestController {

    @Autowired
    @Qualifier("personServiceImp")
    private PersonService personService;

    @PostMapping("/save")
    public ResponseEntity<?> createPerson(@RequestBody Person person) {
        personService.save(person);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping()
    public ModelAndView index (Model model, @AuthenticationPrincipal Person customUser) {
        model.addAttribute("person_v2", customUser);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin/adminPage");
        return modelAndView;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Person>> readPerson() {
        final List<Person> personList = personService.index();
        return personList != null &&  !personList.isEmpty()
                ? new ResponseEntity<>(personList, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updatePerson(@PathVariable(name = "id") Long id, @RequestBody Person person) {
        final boolean updated = personService.update(id, person);

        return updated
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deletePerson(@PathVariable(name = "id") Long id) {
        final boolean deleted = personService.delete(id);

        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @GetMapping("/{id}")
    public Person retrieveStudent(@PathVariable long id) {
        return personService.show(id);
    }
}
