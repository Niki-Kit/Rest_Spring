package web.service;

import web.model.Person;

import java.util.List;

public interface PersonService {

    List<Person> index();
    Person show(Long  id);
    boolean save(Person person);
    boolean update(Long  id, Person updatedPerson);
    boolean delete(Long  id);
    Person findByName(String username);
}
