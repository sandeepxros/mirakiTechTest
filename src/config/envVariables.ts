const envVariables = {
  JWT_SECRET: process.env.JWT_SECRET || "JWT_SECRETJWT_SECRET",
  MONGODB_URI:process.env.MONGODB_URI || "mongodb://localhost:27017/"
};

export default function getEnvVariable(
  key: keyof typeof envVariables,
  defaultValue?: string,
) {
  return envVariables[key] || defaultValue;
}
