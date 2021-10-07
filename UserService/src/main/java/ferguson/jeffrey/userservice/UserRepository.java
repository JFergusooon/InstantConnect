package ferguson.jeffrey.userservice;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, String> {


    List<User> findAll();

    User findByUsername(String username);

    User findByEmail(String email);

    List<User> findFriendsByUsername(String username);

    List<User> findByUsernameLike(String term);





}
