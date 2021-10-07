package ferguson.jeffrey.userservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;


@RestController
@RequestMapping("/user")
public class UserRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/register/{username}/{firstname}/{lastname}/{email}/{password}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public void create(@PathVariable String username, @PathVariable String firstname, @PathVariable String lastname, @PathVariable String email, @PathVariable String password) {
        User newUser = new User();
        Role userRole = roleRepository.findByRoleName(Role.ROLE_USER);
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        newUser.setUsername(username);
        newUser.setFirstname(firstname);
        newUser.setLastname(lastname);
        newUser.setEmail(email);
        newUser.setPageColor("blue");
        newUser.setStatus("Just Vibin mah dude");

        newUser.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(newUser);
    }

    @PutMapping("/addFriend/{username}/{friendname}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void addFriend(@PathVariable String username, @PathVariable String friendname) {
        User user = userRepository.findByUsername(username);
        User friend = userRepository.findByUsername(friendname);
        user.getFriends().add(friend);
        friend.getFriends().add(user);
        userRepository.save(user);
        userRepository.save(friend);
    }

    @GetMapping("")
    public List<User> findAll(){
        return userRepository.findAll();
    }

    @GetMapping("/getFriends/{username}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public List<User> getFriends(@PathVariable String username){
        List<User> result = userRepository.findFriendsByUsername(username);
        return result;
    }

    @GetMapping("/getAllFriends/{username}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<User> getAllFriends(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        List<User> usersFriends = user.getFriends();

        return usersFriends;
    }
    @GetMapping("/{email}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public User getByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email);
    }

    @GetMapping("/getByUsername/{username}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public User getByUsername(@PathVariable String username){
        return userRepository.findByUsername(username);
    }

    @GetMapping("/findByUsername/{term}")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    public List<User> findByUsernameLike(@PathVariable String term) {
        return userRepository.findByUsernameLike("%" + term + "%");
    }


    @PutMapping("/removeFriend/{username}/{friendname}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void removeFriend(@PathVariable String username, @PathVariable String friendname) {
        User user = userRepository.findByUsername(username);
        User friend = userRepository.findByUsername(friendname);
        if(user.getFriends().contains(friendname)){
            user.getFriends().remove(friend);
            friend.getFriends().remove(username);
            userRepository.save(user);
            userRepository.save(friend);
        } else {
            System.out.println("Friend does not exist");
        }


    }
    @PostMapping("/blockUser/{username}/{blockUsername}")
    @ResponseStatus(HttpStatus.CREATED)
    public void blockUser(@PathVariable String username, @PathVariable String blockUsername){
        User user = userRepository.findByUsername(username);
        User blockedUser = userRepository.findByUsername(blockUsername);

        user.getBlockedUsers().add(blockedUser);
        blockedUser.getBlockedUsers().add(user);
        userRepository.save(user);
        userRepository.save(blockedUser);

    }

    @PutMapping("/unblockUser/{username}/{blockedUsername}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void unblockUser(@PathVariable String username, @PathVariable String blockedUsername){

    }

    @PutMapping("/updateStatus/{username}/{new status}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateStatus(@PathVariable String username, @PathVariable String newStatus){
        User user = userRepository.findByUsername(username);
        user.setStatus(newStatus);
        userRepository.save(user);
    }

    @PutMapping("/updateUser/{username}/{newUsername}/{password}/{firstname}/{lastname}/{email}/{motto}/{color}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateUser(@PathVariable String username, @PathVariable String newUsername, @PathVariable String password, @PathVariable String firstname, @PathVariable String lastname, @PathVariable String email, @PathVariable String motto, @PathVariable String color){
        User user = userRepository.findByUsername(username);

        if(!newUsername.equals(" ")) {
            user.setUsername(newUsername);
        }
        if(!password.equals(" ")) {
            user.setPassword(bCryptPasswordEncoder.encode(password));
        }
        if(!firstname.equals(" ")) {
            user.setFirstname(firstname);
        }
        if(!lastname.equals(" ")) {
            user.setLastname(lastname);
        }
        if(!email.equals(" ")) {
            user.setEmail(email);
        }
        if(!motto.equals(" ")) {
            user.setStatus(motto);
        }
        if(!color.equals(" ")) {
            user.setPageColor(color);
        }

        userRepository.save(user);

    }

    @PutMapping("/updateColor/{username}/{newColor}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateColor(@PathVariable String username, @PathVariable String newColor){
        User user = userRepository.findByUsername(username);
        user.setPageColor(newColor);
        userRepository.save(user);
    }

}
