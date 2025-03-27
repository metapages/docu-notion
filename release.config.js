module.exports = {
  branches: [
    'main',  // regular releases
    {name: 'beta', prerelease: true}, // beta releases
    {name: 'alpha', prerelease: true}  // alpha releases
  ],
  branches: [{name:"release"}, { name: "metapage-custom-plugins", channel: "alpha", prerelease: "alpha"}],
};
