namespace Re_Gift.Server.Helpers
{
    public static class EnumsHelp
    {
        

        public enum CompanyNames
        {
            Nike = 0,
            Adidas = 1,
            Elgiganten = 2,
            BattleNet = 3,
            PSN = 4,
            Steam = 5,
            Ikea = 6

        }

        public enum Filterred
        {
            LowToHighPrice = 0,
            HighToLowPrice = 1,
            Oldest = 2,
            Newest = 3,
            ABC = 4,
            ZXC = 5
        }

        public static string GetCompanyName(int choice)
        {
            
            if (Enum.IsDefined(typeof(CompanyNames), choice)) // Checkar om choice(Inten) är inom ramen för CompanyNames valen, ifall den är det...
            {
                
                return ((CompanyNames)choice).ToString(); // Ta den ramen, returnera en sträng av det!!!!
            }
            else
            {
                
                return "Invalid company choice";
            }
        }

        public static string GetFilteringName(int choice)
        {

            if (Enum.IsDefined(typeof(Filterred), choice)) // Checkar om choice(Inten) är inom ramen för CompanyNames valen, ifall den är det...
            {

                return ((Filterred)choice).ToString(); // Ta den ramen, returnera en sträng av det!!!!
            }
            else
            {

                return "Invalid Filter choice";
            }
        }

    }
}
