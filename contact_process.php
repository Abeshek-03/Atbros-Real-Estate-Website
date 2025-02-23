<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $first_name = strip_tags(trim($_POST["first_name"]));
    $last_name  = strip_tags(trim($_POST["last_name"]));
    $email      = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone      = strip_tags(trim($_POST["phone"]));
    $subject    = strip_tags(trim($_POST["subject"]));
    $message    = trim($_POST["message"]);

    // Check that required fields are not empty
    if (empty($first_name) || empty($last_name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        // Redirect back with error
        header("Location: contact.html?error=emptyfields");
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?error=invalidemail");
        exit;
    }

    // Validate phone number format (basic)
    if (!preg_match("/^\+\d{2}\d{10}$/", $phone)) {
        header("Location: contact.html?error=invalidphone");
        exit;
    }

    // Prepare the email
    $recipient = "abeshek.a@gmail.com";
    $email_subject = "New Contact Us Message: $subject";
    $email_body = "You have received a new message from your website contact form.\n\n".
                  "Here are the details:\n".
                  "Name: $first_name $last_name\n".
                  "Email: $email\n".
                  "Phone: $phone\n".
                  "Subject: $subject\n".
                  "Message:\n$message\n";

    $headers = "From: $first_name $last_name <$email>";

    // Send the email
    if (mail($recipient, $email_subject, $email_body, $headers)) {
        // Redirect to thank you page
        header("Location: contact.html?success=1");
        exit;
    } else {
        // Redirect back with error
        header("Location: contact.html?error=mailfail");
        exit;
    }
} else {
    // Not a POST request
    header("Location: contact.html");
    exit;
}
?>
