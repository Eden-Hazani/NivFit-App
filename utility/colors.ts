
export class Colors {
    public static skyBlue: string;
    public static primaryBackground: string;
    public static inactiveTint: string;
    public static black: string;

    public static async InitializeAsync() {
        Colors.primaryBackground = 'white'
        Colors.skyBlue = '#01adee'
        Colors.inactiveTint = '#808080'
        Colors.black = 'black'
    }
}

Colors.InitializeAsync();
