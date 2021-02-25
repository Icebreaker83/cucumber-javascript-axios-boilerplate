# FILE NAME: user.feature
# DESCRIPTION: user scenario's
# CREATED: 2018-09-07

Feature: User

  @all_env
  Scenario: Edit User Profile
    Given I have a user that is logged in
    When I edit my user data
    Then I should be able to see the changes on my user profile

  @all_env
  Scenario: Delete User Profile
    Given I have a user that is registered
    And I have logged in
    When I delete my profile and I try to log in again
    Then I shouldn't be able to log in

  @all_env
  Scenario: Upload User Profile Image
    Given I have a user that is logged in
    When I upload avatar image for my profile
    Then I should be able to see the avatar image on my profile

  