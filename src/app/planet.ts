export class Planet {
    id: number; // id in our list (for us)
    hostname: string; // pl_hostname, Stellar name most commonly used in the literature
    letter: string; // pl_letter, Letter assigned to the planetary component of a planetary system
    name: string; // pl_name, Planet name most commonly used in the literature.
    orbitalPeriode: number; // pl_orbper, Time the planet takes to make a complete orbit around the host star or system. units = days
    radiusJupiter: number; // pl_radj, Length of a line segment from the center of the planet to its surface, measured in units of radius of Jupiter.
    massJupiter: number; // pl_bmassj, planet mass estimate available, in order of preference: Mass, M*sin(i)/sin(i), or M*sin(i), depending on availability, and measured in Jupiter masses
    density: number; // pl_dens, units = g/cm^3, Amount of mass per unit of volume of the planet.
    rightAscension: number; // ra, units = decimal degrees, Right ascension of the planetary system
    declination: number; // dec, units = decimal degrees, Declination of the planetary system
    distanceFromOurSolar: number; // st_dist, units = parsecs (1 = 3.26 light-years or 31×10^12 km)
    temperature: number; // st_teff, units = kelvin or K
    stellarMass: number; //st_mass, Stellar Mass , Amount of matter contained in the star, measured in units of masses of the Sun.
    stellarRadius: number; // st_rad, Length of a line segment from the center of the star to its surface, measured in units of radius of the Sun
    lastUpdate: string; // rowupdate, Date of last update of the planet parameters.
}
