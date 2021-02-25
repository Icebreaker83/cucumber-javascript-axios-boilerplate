# FILE NAME: login.feature
# DESCRIPTION: log in scenario's
# CREATED: 2018-09-05

Feature: Log In

  @all_env
  Scenario: Registered user log's in
    Given I have a registered user
    When I try to log in
    Then I should be able to login

  @all_env
  Scenario: Registered user tries to log in with wrong password
    Given I have a registered user
    When I try to log in with wrong password
    Then I shouldn't be able to log in

  @performance
  Scenario: Check if refresh token is valid for 24h
    Given I have a user that is logged in
    Then Refresh token should be valid for 24h