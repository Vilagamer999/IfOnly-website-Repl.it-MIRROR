import React from "react"
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Button,
    Divider,
} from "@material-ui/core"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { Chat } from "@material-ui/icons"
import green from "@material-ui/core/colors/green"
import blue from "@material-ui/core/colors/blue"

const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[700],
        },
        secondary: blue,
    },
})

const navbarItems = [
    <a href="https://discord.gg/DmAqWfQ" className="navlink">
        <Button color="inherit" startIcon={<Chat />}>
            Discord
        </Button>
    </a>,
]

export default () => {
    let Centered = (props) => (
        <Grid container justify="center">
            {props.children}
        </Grid>
    )

    return (
        <ThemeProvider theme={theme}>
            <nav style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography style={{ flexGrow: 1 }} variant="h6">
                            The IfOnly Guild
                        </Typography>
                        {navbarItems}
                    </Toolbar>
                </AppBar>
            </nav>
            <main className="main">
                <Grid container>
                    <Centered>
                        <Typography variant="h2">The IfOnly Guild</Typography>
                    </Centered>
                    <Centered>
                        <Typography variant="subtitle">
                            A Hypixel guild based on the community.
                        </Typography>
                    </Centered>
                </Grid>
                <Divider style={{ margin: 15 }} />
                <Grid container>
                    <Centered>
                        <Typography variant="h3">About</Typography>
                    </Centered>
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}
                        >
                            IfOnly is a Hypixel guild founded back in early
                            2018. It grew quite big over time and eventually
                            surpased 90 members. Originally, the guild was based
                            more on minigame skill as well as competitive
                            statistics, but over time we realized that we have
                            something special: our community. We have since
                            stopped requiring high statistics/skill levels, and
                            now focus primarily on our players. We regularly
                            host events, giveaways, and more!
                        </Typography>
                    </Centered>
                </Grid>
            </main>
        </ThemeProvider>
    )
}
