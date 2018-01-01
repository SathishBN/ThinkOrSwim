# RSI2 will be used to determine exit.
# Even on a loss, the RSI indicates a lower high sell point.
# I see this as selling at a high for a stop loss.

# 80 for long / 20 for short for Daily chart
# 90 for long / 10 for short for 15min chart
# 85 for long / 15 for short for 30min chart

input side = {DEFAULT LONG, SHORT};
input target = 75;
input rsi_length = 2;
input price = close;

# RSI
def NETCHGAVG = WildersAverage(price - price[1], rsi_length);
def TOTCHGAVG = WildersAverage(AbsValue(price - price[1]), rsi_length);
def CHGRATIO = if TOTCHGAVG != 0 then NETCHGAVG / TOTCHGAVG else 0;
def RSI = Round(50 * (CHGRATIO + 1), NUMBEROFDIGITS = 0);

DEF LMT;
SWITCH (SIDE) {
CASE LONG:
    LMT = RSI >= TARGET;
CASE SHORT:
    LMT = RSI <= TARGET;
}

PLOT EXIT = LMT;
EXIT.SETDEFAULTCOLOR(CREATECOLOR(255, 255, 255));
EXIT.SETPAINTINGSTRATEGY(PAINTINGSTRATEGY.BOOLEAN_ARROW_DOWN);
