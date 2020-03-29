const DATA_SRC_URL = 'https://twitter.com/ncdcgov?lang=en';
const PORT = 7019;
const STATES = [
	"Abia",
	"Adamawa",
	"Akwa-Ibom",
	"Anambra",
	"Bauchi",
	"Benue",
	"Borno",
	"Bayelsa",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"FCT",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kebbi",
	"Kano",
	"Kogi",
	"Katsina",
	"Kwara",
	"Lagos",
	"Nassarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yola",
	"Zamfara"
]
const STATE_SPREAD_DATA_HOOK_STR = 'Currently;';
const TOTAL_COUNT_DATA_HOOK_STR = 'As at';

module.exports = {
	DATA_SRC_URL,
	PORT,
	STATES,
	STATE_SPREAD_DATA_HOOK_STR,
	TOTAL_COUNT_DATA_HOOK_STR
}