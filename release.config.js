module.exports = {
  branches: [
    'main',  // regular releases
    "metapage-custom-plugins",
    {name: 'beta', prerelease: true}, // beta releases
    {name: 'alpha', prerelease: true}  // alpha releases
  ],
  
};
