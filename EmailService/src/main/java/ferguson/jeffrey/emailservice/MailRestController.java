package ferguson.jeffrey.emailservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping("/email")
public class MailRestController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }


    @PostMapping("/FriendRequestEmail/{comingFrom}/{goingTo}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void friendRequestNotification(@PathVariable String comingFrom, @PathVariable String goingTo) throws MessagingException {
        ServiceInstance serviceInstance = loadBalancerClient.choose("USER-SERVICE");
        String comingFromUrl = serviceInstance.getUri() + "/user/getByUsername/" + comingFrom;
        String goingToUrl = serviceInstance.getUri() + "/user/getByUsername/" + goingTo;
        User comingFromUser = restTemplate().getForObject(comingFromUrl, User.class);
        System.out.println(comingFromUser.getUsername());
        User goingToUser = restTemplate().getForObject(goingToUrl, User.class);
        System.out.println(goingToUser.getUsername());
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage);

        System.out.println(goingToUser.getEmail());
        System.out.println(comingFromUser.getEmail());
        message.setFrom("SocialiteSecrets@gmail.com");
        if(comingFromUser.getFriends().contains(goingToUser.getUsername())){
            System.out.println("This user is already your friend, silly goose");
        }

        message.setTo(goingToUser.getEmail());
        message.setSubject("Friend Request");
        String mailContent = "<h2>You have a new friend request from " + comingFromUser.getUsername() + "</h2>\n" + "<a style='' href='http://localhost:3001/addFriend/" + goingToUser.getUsername() + "/" + comingFromUser.getUsername() + "'><button style= 'position: relative;\n" +
                "    margin-left: 65px;\n" +
                "    box-shadow:inset 0 0 15px 3px #23395e;\n" +
                "    background: #2e466e linear-gradient(to bottom, #2e466e 5%, #415989 100%);\n" +
                "    border-radius:17px;\n" +
                "    border:1px solid #1f2f47;\n" +
                "    display:inline-block;\n" +
                "    cursor:pointer;\n" +
                "    color:#ffffff;\n" +
                "    font-family: Arial, serif;\n" +
                "    font-size:20px;\n" +
                "    padding-left:70px;\n" +
                "    padding-right:70px;\n" +
                "    padding-bottom: 20px;\n" +
 //               "    text-decoration:none;\n" +
                "    white-space: normal;\n" +
                "    text-shadow:0 1px 0 #263666;\n" +
                "    width: 250px;\n" +
                "    height: 50px;'>" + "Accept Friend Request</button>";
        message.setText(mailContent, true);

        try {
            mailSender.send(mimeMessage);
        }catch (Exception e){
            e.printStackTrace();
        }


    }


}
