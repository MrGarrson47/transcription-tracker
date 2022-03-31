import classes from './ExtraInfo.module.css';

const ExtraInfo = () => {

    return (
        <>
            <div className={classes.extraInfoContainer}>
                <div className={classes.headingContainer}>
                    <p>Overview</p>
                </div>
                <div className={classes.infoMainContainer}>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total jobs received</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>5</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total time spent</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>1hr 22m</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total duration of jobs</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>2hr 52m</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>total money earned</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>$12.54</p>
                        </div>
                    </div>
                    <div className={classes.infoContainer}>
                        <p className={classes.infoLabel}>pay per hour</p>
                        <div className={classes.infoValueContainer}>
                            <p className={classes.infoValue}>$2.34</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExtraInfo;