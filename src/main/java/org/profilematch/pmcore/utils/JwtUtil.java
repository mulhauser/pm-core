package org.profilematch.pmcore.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import javax.inject.Inject;
import javax.ws.rs.core.UriInfo;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.logging.Logger;

/**
 * @author remy
 */
public class JwtUtil {

    public static String issueToken(KeyGenerator keyGenerator, UriInfo uriInfo, String login) {
        Key key = keyGenerator.generateKey();
        String jwtToken = Jwts.builder()
                .setSubject(login)
                .setIssuer(uriInfo.getAbsolutePath().toString())
                .setIssuedAt(new Date())
                .setExpiration(toDate(LocalDateTime.now().plusMinutes(15L)))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
        //logger.info("#### generating token for a key : " + jwtToken + " - " + key.getEncoded());
        return jwtToken;
    }

    public static String refreshToken(KeyGenerator keyGenerator, String token){
        Key key = keyGenerator.generateKey();
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(token).getBody();
        System.out.println(claims.setExpiration(toDate(LocalDateTime.now().plusMinutes(15L))));

        return token;
    }

    private static Date toDate(LocalDateTime localDateTime) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
}
