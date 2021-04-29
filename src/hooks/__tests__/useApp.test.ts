import { act } from "@testing-library/react-hooks";
import * as Hooks from "hooks";
import { useApp, useAppObject } from "hooks/useApp";
import { renderHook, waitFor } from "test/utils";

jest.mock("@material-ui/core");

describe("useApp hook", () => {
  describe("handleCardSelection", () => {
    it("sets selected index", () => {
      const { result } = renderHook<useAppObject>(() => useApp(9));
      act(() => {
        result.current.handleCardSelection(2);
      });

      expect(result.current.selectedIndex).toBe(2);
    });
  });

  describe("handleRightArrow", () => {
    it("increments the currentStartIndex", () => {
      const { result } = renderHook<useAppObject>(() => useApp(9));
      const oldStartIndex = result.current.currentStartIndex;
      act(() => {
        result.current.handleRightArrow();
      });

      expect(result.current.currentStartIndex).toBe(oldStartIndex + 1);
    });

    it("does not increment if we are at the end of the data list", () => {
      const { result } = renderHook<useAppObject>(() => useApp(1));

      const oldStartIndex = result.current.currentStartIndex;

      act(() => {
        result.current.handleRightArrow();
      });

      expect(result.current.currentStartIndex).toBe(oldStartIndex);
    });
  });

  describe("handleLeftArrow", () => {
    it("decrements the currentStartIndex", () => {
      const { result } = renderHook<useAppObject>(() => useApp(9));
      act(() => {
        result.current.handleRightArrow();
      });
      const oldStartIndex = result.current.currentStartIndex;
      act(() => {
        result.current.handleLeftArrow();
      });

      expect(result.current.currentStartIndex).toBe(oldStartIndex - 1);
    });

    it("does not increment if we are at the end of the data list", () => {
      const { result } = renderHook<useAppObject>(() => useApp(1));

      const oldStartIndex = result.current.currentStartIndex;

      act(() => {
        result.current.handleLeftArrow();
      });

      expect(result.current.currentStartIndex).toBe(oldStartIndex);
    });
  });

  describe("Responsiveness", () => {
    beforeEach(() => {
      jest.unmock("hooks");
    });

    test("it responds to phone and tablet screens", async () => {
      const { result, rerender } = renderHook<useAppObject>(() => useApp(9));

      expect(result.current.upperLimitOfCards).toBe(3);

      jest.spyOn(Hooks, "useResponsiveChecks").mockImplementation(() => ({
        phoneScreens: false,
        tabletScreens: true,
      }));

      await waitFor(() => {
        rerender();
      });
      await waitFor(() => {
        expect(result.current.upperLimitOfCards).toBe(2);
      });

      jest.spyOn(Hooks, "useResponsiveChecks").mockImplementation(() => ({
        phoneScreens: true,
        tabletScreens: false,
      }));

      await waitFor(() => {
        rerender();
      });

      await waitFor(() => {
        expect(result.current.upperLimitOfCards).toBe(1);
      });
    });
  });
});
