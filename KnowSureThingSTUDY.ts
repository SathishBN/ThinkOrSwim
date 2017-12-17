declare lower;

input RC1_LEN = 5;
input RC1_SMA = 10;
input RC2_LEN = 5;
input RC2_SMA = 15;
input RC3_LEN = 5;
input RC3_SMA = 20;
input RC4_LEN = 5;
input RC4_SMA = 25;
input KST_SMA = 5;
input FILTER = 0.30; # SIZE of MOVEMENT
input price = close;

DEF RC1 = if price[RC1_LEN] > 0 then (price / price[RC1_LEN] - 1) * 100 else 0;
DEF RC2 = if price[RC2_LEN] > 0 then (price / price[RC2_LEN] - 1) * 100 else 0;
DEF RC3 = if price[RC3_LEN] > 0 then (price / price[RC3_LEN] - 1) * 100 else 0;
DEF RC4 = if price[RC4_LEN] > 0 then (price / price[RC4_LEN] - 1) * 100 else 0;

DEF RCMA1 = SIMPLEMOVINGAVG(RC1,RC1_SMA);
DEF RCMA2 = SIMPLEMOVINGAVG(RC2,RC2_SMA);
DEF RCMA3 = SIMPLEMOVINGAVG(RC3,RC3_SMA);
DEF RCMA4 = SIMPLEMOVINGAVG(RC4,RC4_SMA);

PLOT KST = (RCMA1 * 1) + (RCMA2 * 2) + (RCMA3 * 3) + (RCMA4 * 4);

PLOT SignalLine = SIMPLEMOVINGAVG(KST,9);

PLOT ZeroLine = 0;

PLOT RATING =
IF KST > SignalLine AND KST[1] < SignalLine[1] AND ROUND(KST-KST[1],2) >= FILTER THEN ROUND(KST-KST[1],2)
ELSE IF KST < SignalLine AND KST[1] > SignalLine[1] AND ROUND(KST-KST[1],2) <= -FILTER THEN ROUND(KST-KST[1],2)
#ELSE IF KST > ZeroLine AND KST[1] < ZeroLine AND ROUND(KST-KST[1],2) >= FILTER THEN ROUND(KST-KST[1],2)
#ELSE IF KST < ZeroLine AND KST[1] > ZeroLine AND ROUND(KST-KST[1],2) <= -FILTER THEN ROUND(KST-KST[1],2)
ELSE 0;

KST.SETDEFAULTCOLOR(COLOR.MAGENTA);
SignalLine.SETDEFAULTCOLOR(COLOR.CYAN);
ZeroLine.SETDEFAULTCOLOR(COLOR.DARK_GRAY);
RATING.HIDE();
RATING.HIDEBUBBLE();
