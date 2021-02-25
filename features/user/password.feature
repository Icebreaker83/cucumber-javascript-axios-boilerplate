# FILE NAME: password.feature
# DESCRIPTION: Various scenarios for password change
# CREATED: 2018-09-04

Feature: User password handling

  @all_env
  Scenario: Password reset request should send one and only one password reset email
    Given I have a user that is registered
    When I send the request to reset the password
    Then I should receive only one email with subject "Reset password code" which contains link "Reset my password"

  @all_env
  Scenario: Reset password via email
    Given I have a user that is registered
    When I send the request to reset the password
    And I click on "Reset my password" link in received email with subject "Reset password code"
    And I enter new password
    Then I should be able to login using new password

  @all_env
  Scenario: Reset password via email and try to log in with old password
    Given I have a user that is registered
    When I send the request to reset the password
    And I click on "Reset my password" link in received email with subject "Reset password code"
    And I enter new password
    And I try to log in with old password
    Then I shouldn't be able to log in

  @wip
  Scenario: Reset password via email to old password
    Given I have a user that is registered
    And that his password has already been changed to new one
    When I send the request to reset the password
    And I click on "Reset my password" link in received email with subject "Reset password code"
    And I enter old password
    Then I shouldn't be able to reset the password
  
  @all_env
  Scenario: Update password from App
    Given I have a user that is registered
    And I have logged in
    When I update my current password with the new one
    Then I should be able to login using new password

  @all_env
  Scenario: Update password from App and try to log in with old password
    Given I have a user that is registered
    And I have logged in
    When I update my current password with the new one
    And I try to log in with old password
    Then I shouldn't be able to log in