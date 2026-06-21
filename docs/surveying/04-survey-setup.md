---
title: Survey Setup (T3RRA on the Getac)
---
# :material-laptop: Survey Setup (T3RRA on the Getac)

The full click-by-click for setting up and running a DualEM survey in **T3RRA Survey
(v2.279)** on the Getac. Exporting is covered in the next chapter,
[Exporting](05-exporting.md).

!!! info "AT A GLANCE"
    Set up the job in the Wizard, import and read the boundary, connect GPS and the
    DualEM, then drive the AB line. Confirm the `$PDLS1` value updates five times per
    second before you survey.

## 1. Open T3RRA & start the Wizard

Open the **T3RRA** application from your desktop, then select the **Wizard** button.

![T3RRA start screen with the Wizard button highlighted](img/t3rra-wizard-1.png)
*Open T3RRA from the desktop and click **Wizard**.*

Fill in the pop-up form with the following details, then select **OK**:

| Field | What to enter |
| --- | --- |
| **Grower** | Client name |
| **Farm** | Deal ID |
| **Field** | Name of the paddock. If covering multiple paddocks, enter **"Multi Paddock"** |
| **Project Name** | Leave it. This auto-generates with today's date |

![The Wizard pop-up form with Grower, Farm, Field and Project Name](img/t3rra-wizard-2.png)
*The Wizard form. Fill it in, then click **OK**.*

## 2. Import the boundary

Select the **Collect** button, then click **Import** to begin importing your boundaries.

![Collect screen with the Import button highlighted](img/import-shapefile-1.png)
*Click **Collect**, then **Import**.*

Select **.shp** to upload a shapefile.

![Supported-imports list with Shapefile (.shp) highlighted](img/import-shapefile-2.png)
*Choose **.shp**.*

!!! note "NOTE"
    In future we may also use **.kml / .kmz** files as an alternative. For now, use
    **.shp**.

## 3. Read the boundary

Click the **Read** button.

![Shapefile dialog with the Read button highlighted](img/read-boundary-1.png)
*Click **Read**.*

In the left-hand panel, **deselect Surface**, then select **Boundary** from the
dropdown. Click **Import**.

![Import panel with Surface deselected and Boundary selected, boundary shown in the preview](img/read-boundary-2.png)
*Deselect **Surface**, select **Boundary**, then **Import**.*

## 4. Set the data type

In the **Data Type** window, select **DualEM 1S**, then click **Start**.

![Data Type window with DualEM 1S selected and Start highlighted](img/data-type-dualem-1.png)
*Select **DualEM 1S**, then **Start**.*

The boundary loads on screen. Once it has loaded, select **Settings** in the top-right
corner.

![Loaded boundary on screen with the Settings button highlighted](img/data-type-dualem-2.png)
*Open **Settings** (top-right).*

## 5. Connect GPS

Go to the **GPS** tab and click the **Scan for GPS** button.

![GPS tab with the Scan for GPS button highlighted](img/gps-scan-1.png)
*Click **Scan for GPS**.*

The port scan displays the COM port your GPS is connected to. Click **Connect**. The
system selects the correct port automatically.

![Port scan results with the Connect button highlighted](img/gps-scan-2.png)
*Click **Connect**. The correct port is selected automatically.*

## 6. Connect the DualEM & verify data

How you connect depends on your setup:

| Setup | How to connect |
| --- | --- |
| **Wireless** | The DualEM will **always be on COM Port 20**. Select it and click **Connect**. |
| **Wired** | Open **Device Manager** to find the correct COM port, update the dropdown, then click **Connect**. |

![Settings window with COM Port 20 selected and Connect highlighted](img/dualem-connect-1.png)
*Select the port (COM Port 20 wireless) and click **Connect**.*

!!! warning "WARNING: verify the data before you drive"
    Correct DualEM data shows a `$PDLS1` value updating five times per second. If you
    do not see `$PDLS1` updating at that rate, the unit is not reading correctly. Stop
    and fix it before surveying (see [Troubleshooting](06-troubleshooting.md)).

Once confirmed, click **Close**. Your settings save automatically.

![Raw sensor data showing a live $PDLS1 value updating](img/dualem-connect-2.png)
*A live `$PDLS1` value confirms the DualEM is reading. Then click **Close**.*

## 7. Set the AB line & start

Once you are in position, click the **Start** button. Then open the **Guidance** tab
at the top of the screen.

![Survey screen with Start highlighted and the Guidance tab open](img/ab-line-1.png)
*Click **Start**, then open the **Guidance** tab.*

Click **Set** next to **Point A** and begin driving.

!!! note "NOTE"
    The Guidance window cannot be minimised while you set the AB line. You can move it
    to the side of the screen.

When you reach **Point B**, click **Set**, then click **Apply**.

![Guidance dialog with Set next to Point A and Point B, and Apply highlighted](img/ab-line-2.png)
*Set **Point A**, drive to **Point B**, **Set**, then **Apply**.*

## 8. Run the survey

As with **Farmworks**, the navigation light bar is at the top of the screen and your
AB lines are displayed. A metre value shows how close you are to the line.

![Survey running with the navigation light bar, Stop and Return highlighted](img/survey-run-1.png)
*Drive the AB lines. When complete, click **Stop**, then **Return**.*

Once your survey is complete, click **Stop**, then click the **Return** button in the
top right. When prompted, select **Yes** to keep changes to elevation points.

![Prompt to keep changes to elevation points with Yes highlighted](img/survey-run-2.png)
*Select **Yes** to keep changes to elevation points.*

---

Next: [Exporting](05-exporting.md). Get the data off the Getac and to the GIS team.
