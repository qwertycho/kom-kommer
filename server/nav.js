const navigatie = {
  navBuilder: function (data) {
    try {
      const navData = data.nav;

      var navList = [];
      for (let i = 0; i < navData.length; i++) {
        const navLink = `<li><a href="${navData[i].link}" class="nav-link">${navData[i].name}</a></li>`;
          navList += navLink;
      }
    } catch (error) {
      return error;
    }
    return navList;
  },
};

module.exports = navigatie;
