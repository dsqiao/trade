const SELL = 0;
const BUY = 1;
const direction = {
  SELL: 0,
  BUY: 1,
};
const deepTradeData = [
  { date: '2025.2.24', digest: 'BmvDQpaMn42QrFH9vy5FfZoZVGsFc7EPM7d38N8PicsS', direction: BUY, deep: 10300.034878, usdc: 1500.000141, gas: 0.020188604 },
  { date: '2025.2.25', digest: '7836KpAdeLhJbFdmFUVHhgkRkNf4y6h2x41wMhpNcy6k', direction: BUY, deep: 3593.238095, usdc: 500.000011, gas: 0.035215102 },
  { date: '2025.2.26', digest: 'EYJkEMRYKbfe9p71GkHj1JsPrUtHrDwiWutjDUbK6Eju', direction: BUY, deep: 3615.408791, usdc: 500.000011, gas: 0.012512876 },
  { date: '2025.2.26', digest: 'Ah669aQPNKqJR9N5bBTWSmUnUYEyxkWgpB4tDCTx2WEM', direction: BUY, deep: 5846.648507, usdc: 796.992668, gas: 0.01174646 },
  { date: '2025.3.2', digest: 'FEcoHBsxL7khX8VDdfUeuiZATQG7ZQcc52SaEcM6AjfY', direction: SELL, deep: 6000.000098, usdc: 965.417151, gas: 0.016136456, t: '1' },
  { date: '2025.3.3', digest: '7JRwxTzPjDFbS8ev5Zgz1RcPXQRwJEuvwy7KA42YHS55', direction: BUY, deep: 6019.684257, usdc: 889.000022, gas: 0.014325372, t: '1' },
  { date: '2025.3.9', digest: '5fcppkUZzWwbT6UuJPSaMydwHxr29ghhKTCcgviUfDDc', direction: BUY, deep: 10435.308309, usdc: 999.148636, gas: 0.027615338 },
  { date: '2025.3.9', digest: 'B77wPFUQgWb64i77Yzchc5d1LpiSRCfHHymy6DYEqzv9', direction: BUY, deep: 1982.652359, usdc: 176.441557, gas: 0.002788424 },
  { date: '2025.3.9', digest: '3bZqE2MPRUa1mVXDZEUFYYTnAgP1kKBQUsU7Tr8K2mZu', direction: BUY, deep: 12068.811925, usdc: 999.9, gas: 0.012357888 },
  { date: '2025.3.11', digest: 'CjRdDchVLLa7ttn8umBpYX9Egq5P77f1atN4ndJ6zDhZ', direction: BUY, deep: 3850.565822, usdc: 300, gas: 0.000754548, desc: '300u -> 140sui', t: '2' },
  { date: '2025.3.15', digest: '7YvrMSDpETApjP6dPyGJvg9gK7TEJZqhezSTFTK1r3ar', direction: SELL, deep: 3850.000101, usdc: 372.217585, gas: 0.014967876, t: '2' },
  { date: '2025.3.15', digest: 'AYMSjY9ePGhHmytW7ZjSq4kPKx9VwM4dKD73gqMufrcs', direction: SELL, deep: 5000.000168, usdc: 503.867496, gas: 0.018530508, t: '3' },
  { date: '2025.3.16', digest: 'EZnGWGvYxTjXzNVtj4HxA29ACzti1SmdB4bcaLceJSWz', direction: BUY, deep: 5029.394461, usdc: 450.000019, gas: 0.046028446, t: '3' },
  { date: '2025.3.18', digest: '5Vp6LLXcSHYnrJuvMm6Zk8Vd7nkCQV85ZEwbicU1ybR6', direction: BUY, deep: 5005.291945, usdc: 405.000015, gas: -0.020102078, t: '4' },
  { date: '2025.3.22', digest: 'sn1XpzGAK9Yws74cNeXWzVKZqAK4anMxikvuMSFQXxQ', direction: SELL, deep: 5000.000156, usdc: 431.972515, gas: 0.018496724, t: '4' },
  { date: '2025.3.24', digest: '96JngPiKUDxvkPv3nApAjNu8HwZgx7ax7XM8zuN8Ayki', direction: SELL, deep: 5000.000184, usdc: 450.424348, gas: 0.01741838, t: '5' },
  { date: '2025.3.28', digest: 'HJ96sCC9cqPLV9eLfVXE1pxQKRCT4w5pw13fRUJatpyi', direction: BUY, deep: 5026.301448, usdc: 400.000013, gas: 0.046275354, t: '5' },
  { date: '2025.3.29', digest: 'BAjGdrZwgW1XsK26KGPUkkdNbjfDhQFxFMSDKZrvyAGV', direction: BUY, deep: 7154.84655, usdc: 500.000013, gas: 0.015108752 },
  { date: '2025.3.31', digest: '57yC1pTPtsVPhyM627ZMpaXs4BiHDH3kWwu5E6aia6iP', direction: BUY, deep: 8357.230611, usdc: 500.000038, gas: -0.224597815, t: '6' },
  { date: '2025.4.1', digest: '7hpE4pyTGJp7FAKF7yKodv34Vb9fMwbPhRdtemCm4gwi', direction: SELL, deep: 8357.000484, usdc: 576.42769, gas: 0.02500304, t: '6' },
  { date: '2025.4.3', digest: 'Ds6oYXe7a9Yk6KYN5Tv6vGhpDHoHQRpgYGXH9ds3oWJe', direction: BUY, deep: 8503.521521, usdc: 500.000029, gas: -0.009194036, t: '10' },
  { date: '2025.4.6', digest: '32tpktRMYm4YeizDoNSLAzzJcTk2p9Gf12XxBYGn1SvM', direction: BUY, deep: 8804.695563, usdc: 500.000022, gas: -0.228967228, t: '9' },
  { date: '2025.4.6', digest: '7LtFz485KtcriDuF6ii7Jnsi92Jkg8xGX98fQa2edUNB', direction: BUY, deep: 9475.531756, usdc: 500.000024, gas: 0.014483164, t: '8' },
  { date: '2025.4.7', digest: 'FnxL8MVLwC5FqABwHyDqrsyR9zXFz1XjLV8Yt1gXhahU', direction: BUY, deep: 5356.647047, usdc: 268.692098, gas: 0.015470936, t: '7' },
  { date: '2025.4.9', digest: '3frwKB7r6dzKzS4E2tn8Q7vuyvvz7LzFoWHsaBBPx5wN', direction: SELL, deep: 5356.000258, usdc: 305.919651, gas: 0.02170046, t: '7' },
  { date: '2025.4.9', digest: '2s4uf8W6b36KnbecQtbKLGRgh9oFq6iGg3ekyQHP1XBV', direction: SELL, deep: 9475.000508, usdc: 539.805616, gas: 0.021700536, t: '8' },
  { date: '2025.4.11', digest: 'Fv86woQYrQvfMDep9inKsjeFLDFMCGpX3FuQqqepQbrn', direction: SELL, deep: 8804.000639, usdc: 551.047787, gas: 0.015791656, t: '9' },
  { date: '2025.4.12', digest: '69xurgUDkWv86KqH2PyVo6YMQo1acnmtmh3Ux3E3h4gg', direction: SELL, deep: 8503.001828, usdc: 549.719483, gas: 0.0167939, t: '10' },
];

export {
  direction,
  deepTradeData,
};