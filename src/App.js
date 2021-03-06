import React from "react"

// import banner from './banner.png'; // cool banner

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
                        {/*
                        <div>
                            <img src={banner} width="100" height="55" alt="IfOnly Banner" />
                        </div>
                        */}

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
                <Divider style={{ margin: 20 }} />
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
                <Grid container>
                    <Centered>
                        <Typography variant="h3" style={{ marginTop: 20 }}>
                            Benefits
                        </Typography>
                    </Centered>
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}
                        >
                            Our guild has a lot of things to offer to our
                            members, including weekly game nights, an SMP
                            server, the [I] tag on Hypixel, and lots of friendly
                            faces to play and chat with!
                        </Typography>
                    </Centered>
                </Grid>
                <Grid container>
                    <Centered>
                        <Typography variant="h3" style={{ marginTop: 20 }}>
                            Join Us
                        </Typography>
                    </Centered>
                    <Centered>
                        <Typography
                            variant="body1"
                            style={{ textAlign: "center" }}
                        >
                            If you want to join, feel free! Simply join our
                            Discord, tell us a bit about yourself, and you will
                            get the benefits we have to offer!
                        </Typography>
                    </Centered>
                </Grid>
            </main>
        </ThemeProvider>
    )
}
