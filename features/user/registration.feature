# FILE NAME: registration.feature
# DESCRIPTION: Verify registration
# CREATED: 2018-08-20

Feature: User registration

  @all_env @wip
  Scenario: Registration request should send one and only one registration email
    Given I have an unregistered email
    When I register new user using the given email
    Then I should receive only one email with subject "Registration" which contains link "Confirm Email Address"

  @all_env
  Scenario: Register new user
    Given I have an unregistered email
    When I register new user using the given email
    And I verify the registration via email
    Then I should be able to login
  
  @all_env
  Scenario: Registered user should not be able to register again
    Given I have a registered user
    When I attempt to register again
    Then I should get the response that registration has failed because user is already registered
