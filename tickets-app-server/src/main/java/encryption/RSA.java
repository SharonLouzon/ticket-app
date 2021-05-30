package encryption;

import javax.crypto.Cipher;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Key;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;


public class RSA {
    private static int RSA_KEY_LENGTH = 2048;
    private static String ALGORITHM_NAME = "RSA" ;
    private static String PADDING_SCHEME = "OAEPWITHSHA-512ANDMGF1PADDING" ;
    private static String MODE_OF_OPERATION = "ECB" ;

    public static KeyPair generateKeyPair () throws NoSuchAlgorithmException {
        KeyPairGenerator rsaKeyGen = KeyPairGenerator.getInstance(ALGORITHM_NAME) ;
        rsaKeyGen.initialize(RSA_KEY_LENGTH) ;
        KeyPair rsaKeyPair = rsaKeyGen.generateKeyPair() ;
        return rsaKeyPair;
    }

    public static String rsaEncrypt(String message, Key publicKey) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM_NAME + "/" + MODE_OF_OPERATION + "/" + PADDING_SCHEME) ;
        cipher.init(Cipher.ENCRYPT_MODE, publicKey) ;
        byte[] cipherTextArray = cipher.doFinal(message.getBytes()) ;
        return Base64.getEncoder().encodeToString(cipherTextArray) ;
    }


    public static String rsaDecrypt(String encryptedMessage, Key privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM_NAME + "/" + MODE_OF_OPERATION + "/" + PADDING_SCHEME) ;
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] encryptedMessageBytes = Base64.getDecoder().decode(encryptedMessage);
        byte[] plainText = cipher.doFinal(encryptedMessageBytes);
        return new String(plainText) ;
    }
   
    
    public static Key getPublicKey(String publicString) throws GeneralSecurityException, IOException 
    {
    	// When you need your bytes back you call the decoder on the string.
	   byte[] keyBytes = Base64.getDecoder().decode((publicString.getBytes()));
	   
	   X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
	   KeyFactory keyfact = KeyFactory.getInstance("RSA");
	   return keyfact.generatePublic(spec);
     }
    
    public static Key getPrivateKey(String privateString) throws GeneralSecurityException, IOException 
    {
    	// When you need your bytes back you call the decoder on the string.
	   byte[] keyBytes = Base64.getDecoder().decode((privateString.getBytes()));
	   
	   PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec (keyBytes);
	   KeyFactory keyfact = KeyFactory.getInstance("RSA");
	   
	   return keyfact.generatePrivate(spec);
     }
}
