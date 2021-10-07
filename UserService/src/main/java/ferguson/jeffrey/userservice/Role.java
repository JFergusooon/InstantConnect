package ferguson.jeffrey.userservice;

import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "roles")
public class Role extends RepresentationModel<Role> implements Serializable {
    private static final long serialVersionUID = 7675094270040931712L;

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_USER = "USER";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private int roleId;

    @Column(name = "role_name")
    private String roleName;


}
