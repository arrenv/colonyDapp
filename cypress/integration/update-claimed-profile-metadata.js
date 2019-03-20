describe('Update Claim Profile Metadata', () => {
  it('Use a TrufflePig wallet', () => {
    cy.get('button')
      .contains('TrufflePig')
      .click();
  });

  it('Select the second account and Log in', () => {
    /*
     * Click on the Button disquised as a Select
     */
    cy.get('button[data-test="trufflepigAccountSelector"]').click();
    /*
     * Select the second entry (Account 1), focus it, and click it
     */
    cy.get('li#accountIndex-listbox-entry-0')
      .trigger('mouseover')
      .click();
    /*
     * Click on the button to go to the dApp
     */
    cy.get('button')
      .contains('Go to Colony')
      .click();
  });

  it('Check that the account is already claimed', () => {
    /*
     * Click the Avatar Dropdown
     */
    cy.get('button[data-test="avatarDropdown"]').click();
    /*
     * Click on the Get Started link
     */
    cy.get('button')
      .contains('Get started')
      .should('not.exist');
  });

  /*
   * Update profile metadata
   */

  it('Go to the User Profile Settings', () => {
    cy.goToUserProfileSettings();
  });

  it('Update the User Profile Values', () => {
    cy.fixture('users').then(({ displayName, bio, website, location }) => {
      /*
       * @NOTE We clear all inputs before typing in data
       * This is just so you can run the test multiple types w/o concatenating it
       */
      cy.get('input[data-test="userSettingsName"]')
        .clear()
        .type(displayName);
      cy.get('textarea[data-test="userSettingsBio"]')
        .clear()
        .type(bio);
      cy.get('input[data-test="userSettingsWebsite"]')
        .clear()
        .type(website);
      cy.get('input[data-test="userSettingsLocation"]')
        .clear()
        .type(location);
    });
    cy.get('button[data-test="userSettingsSubmit"]')
      .click()
      .wait(2000);
  });

  /*
   * Check the updated profile metadata
   */
  it('Go to the User Profile', () => {
    cy.goToUserProfile();
  });

  it('Check the Updated User Profile Values', () => {
    cy.fixture('users').then(({ displayName, bio, website, location }) => {
      /*
       * @NOTE We clear all inputs before typing in data
       * This is just so you can run the test multiple types w/o concatenating it
       */
      cy.get('h2[data-test="userProfileName"]')
        .should('exist')
        .should('contain', displayName);
      cy.get('p[data-test="userProfileBio"]')
        .should('exist')
        .should('contain', bio);
      cy.get('a[data-test="userProfileWebsite"]')
        .should('exist')
        .should('contain', website);
      cy.get('h4[data-test="userProfileLocation"]')
        .should('exist')
        .should('contain', location);
    });
  });

  /*
   * Update the avatar
   */

  it('Go to the User Profile Settings', () => {
    cy.goToUserProfileSettings();
  });

  it('Update the User Avatar', () => {
    cy.get('div[data-test="avatarUploaderDrop"]').uploadAvatar(
      'jolly-roger.jpeg',
    );
  });

  it('Check uploaded Avatar', () => {
    cy.goToUserProfile();

    cy.get('div[data-test="userProfileAvatar"] div figure div').checkImage(
      'jolly-roger.jpeg',
    );
  });
});
