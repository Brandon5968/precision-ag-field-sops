---
title: Troubleshooting
---
# :material-wrench: Troubleshooting

Quick fixes for the faults that stop a survey. This table is seeded from the
verification cues in the guide. It will grow as we hit and solve more faults in the
field.

!!! info "AT A GLANCE"
    Most field faults are a **COM port**, a **cable**, or a **power** problem. Work
    those three first.

## Symptom → likely cause → fix

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| No **`$PDLS1`** value, or it isn't updating 5×/sec | Wrong COM port, or cable issue | **Wireless** = COM Port 20. **Wired** = find the port in Device Manager. Reseat the cable and power-cycle the DualEM. |
| GPS not found on scan | Receiver not powered or not connected | Check the Emlid receiver has power and the cable is seated, then re-scan. |
| Wired DualEM won't connect | Unknown COM port | Open **Device Manager**, find the DualEM's COM port, set it in the dropdown, then **Connect**. |
| Boundary won't import | Wrong layer selected | In the Read panel, **deselect Surface**, select **Boundary**, then re-import. |
| Export not showing in SharePoint | Wrong working folder, or upload still in progress | Confirm you saved into **`PA Survey – General – Deal ID`**; wait a few minutes for the automatic upload. |
| `[CONFIRM: other common field faults Brandon/techs have hit]` | | |

!!! warning "WARNING"
    Always confirm the `$PDLS1` value is updating five times per second before you
    start driving. Surveying with a unit that is not reading correctly wastes the whole
    run.

## Escalation

If you have worked the COM port, cable, and power checks and it still will not work,
contact **Brandon on 0472 810 174** (see [Support](07-support.md)).
`[CONFIRM: after-hours and hardware-vs-software escalation path.]`
