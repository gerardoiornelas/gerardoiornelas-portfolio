import React, { useState } from "react"
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Paper,
  Stack,
  Fade,
} from "@mui/material"

interface Ticket {
  id: string
  name: string
  instructions: string
  checklist: string[]
}

const mockTickets: Ticket[] = [
  {
    id: "FEAT-001",
    name: "Interactive Gate Demo",
    instructions:
      "Create a split-screen UI that simulates the UI-GATE methodology. Left side: Agent terminal output. Right side: Human validation checklist.",
    checklist: [
      "Checkboxes update terminal state",
      "Terminals shows mandatory stop signal",
      "Human can unlock next ticket only when checklist is full",
    ],
  },
  {
    id: "FEAT-002",
    name: "Visual Consolidation",
    instructions:
      "Apply the Cyan/Teal methodology branding to all UI-GATE page surfaces.",
    checklist: [
      "Purple accents replaced with Cyan",
      "Background tints updated to Cyan variants",
      "Hover states consistent with Authority Layer",
    ],
  },
]

export const GateDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [isGated, setIsGated] = useState(true)

  const ticket = mockTickets[activeStep] || mockTickets[0]
  const isFinished = activeStep >= mockTickets.length

  const handleToggle = (item: string) => {
    const next = { ...checkedItems, [item]: !checkedItems[item] }
    setCheckedItems(next)

    // Check if all items for current ticket are checked
    const allChecked = ticket.checklist.every(i => next[i])
    if (allChecked) {
      setIsGated(false)
    } else {
      setIsGated(true)
    }
  }

  const handleNext = () => {
    setActiveStep(prev => prev + 1)
    setCheckedItems({})
    setIsGated(true)
  }

  const handleReset = () => {
    setActiveStep(0)
    setCheckedItems({})
    setIsGated(true)
  }

  if (isFinished) {
    return (
      <Paper
        sx={{
          p: 4,
          bgcolor: "rgba(56, 180, 198, 0.05)",
          border: "1px solid",
          borderColor: "secondary.main",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="secondary.main" gutterBottom>
          Gate Cleared — System Validated
        </Typography>
        <Typography sx={{ mb: 3, fontWeight: 300 }}>
          You've successfully simulated the UI-GATE loop. No hidden failures
          stacked.
        </Typography>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Restart Simulation
        </Button>
      </Paper>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
        gap: 0,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        borderRadius: 1,
      }}
    >
      {/* Agent View */}
      <Box
        sx={{
          bgcolor: "#0a0a09",
          p: 3,
          fontFamily: "'DM Mono', monospace",
          fontSize: 13,
          color: "#888880",
          borderRight: { md: "1px solid" },
          borderColor: "divider",
          minHeight: 300,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            color: "text.disabled",
            textTransform: "uppercase",
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: isGated ? "warning.main" : "success.main",
            }}
          />
          Agent Terminal
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: "secondary.main", mb: 0.5 }}>
            {">"} Implementing {ticket.id}: {ticket.name}
          </Typography>
          <Typography sx={{ mb: 1.5, opacity: 0.8 }}>
            {ticket.instructions}
          </Typography>
        </Box>

        <Fade in={true}>
          <Box>
            <Typography sx={{ color: "success.main", mb: 0.5 }}>
              [✓] Feature implementation complete
            </Typography>
            <Typography sx={{ color: "success.main", mb: 2 }}>
              [✓] Visual regression check passed
            </Typography>

            <Typography
              sx={{
                color: isGated ? "warning.main" : "secondary.main",
                fontWeight: 500,
              }}
            >
              {ticket.id} COMPLETE — AWAITING HUMAN VALIDATION
            </Typography>

            {!isGated && (
              <Typography sx={{ color: "secondary.main", mt: 1 }}>
                {">"} HUMAN VALIDATED — PROCEED TO{" "}
                {mockTickets[activeStep + 1]?.id || "DONE"}
              </Typography>
            )}
          </Box>
        </Fade>
      </Box>

      {/* Human View */}
      <Box sx={{ p: 3, bgcolor: "background.paper" }}>
        <Typography
          sx={{
            fontSize: 11,
            fontFamily: "'DM Mono', monospace",
            color: "text.disabled",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          Human Validation Gate
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 2, color: "text.primary" }}>
          Validation Checklist for {ticket.id}
        </Typography>

        <Stack spacing={1} sx={{ mb: 3 }}>
          {ticket.checklist.map(item => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  size="small"
                  checked={!!checkedItems[item]}
                  onChange={() => handleToggle(item)}
                  sx={{
                    color: "rgba(56, 180, 198, 0.3)",
                    "&.Mui-checked": { color: "secondary.main" },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: checkedItems[item]
                      ? "text.primary"
                      : "text.secondary",
                  }}
                >
                  {item}
                </Typography>
              }
            />
          ))}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={isGated}
          onClick={handleNext}
          sx={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            letterSpacing: "0.05em",
          }}
        >
          Unlock Next Ticket ▸
        </Button>

        {isGated && (
          <Typography
            align="center"
            sx={{
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              color: "text.disabled",
              mt: 1.5,
            }}
          >
            Gate Active: All items must be validated
          </Typography>
        )}
      </Box>
    </Box>
  )
}
